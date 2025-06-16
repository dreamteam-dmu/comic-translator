// FileUploader.jsx

import { useState } from 'react';
import styled from 'styled-components';
import UploaderForm from './UploaderForm';
import { UploadButton } from './UploadButton';
import { FaRegImage } from 'react-icons/fa';
import { formatFileSize } from '../utils/formatFileSize';
import { Spinner } from './Spinner';

const StyledImage = styled.img`
    width: 100%;
    max-width: 320px;
    border-radius: 14px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    object-fit: cover;
    display: block;

    @media (max-width: 600px) {
        max-width: 98vw;
        margin-top: 1rem;
    }
`;

const FileInfoCard = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    background: #fff;
    border: 1.5px solid #e5e7eb;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    padding: 1.2rem 1.5rem;
    margin-top: 1.5rem;
    box-sizing: border-box;
    width: 100%;
    max-width: 350px;
    margin-left: auto;
    margin-right: auto;

    @media (max-width: 600px) {
        max-width: 98vw;
        padding: 1rem;
        font-size: 0.95rem;
    }
`;

const FileIcon = styled.div`
    background: #f3f4f6;
    border-radius: 8px;
    padding: 0.7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: #6366f1;

    @media (max-width: 600px) {
        font-size: 1.5rem;
        padding: 0.5rem;
    }
`;

const FileDetails = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 0;

    .filename {
        font-weight: 600;
        font-size: 1.05rem;
        color: #222;
        margin-bottom: 0.1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 100%;
        display: block;
    }
    .meta {
        font-size: 0.96rem;
        color: #666;
    }

    @media (max-width: 600px) {
        .filename {
            font-size: 1rem;
        }
        .meta {
            font-size: 0.9rem;
        }
    }
`;

const Slogan = styled.h1`
    font-size: 1.4rem;
    font-weight: 700;
    color: #222;
    margin-bottom: 0.5rem;
    line-height: 1.3;
    text-align: left;
    letter-spacing: -0.02em;

    @media (max-width: 600px) {
        font-size: 1.5rem;
        text-align: center;
    }
`;

const SubText = styled.p`
    font-size: 0.9rem;
    color: #666;
    margin: 0.5rem 0 1.5rem 0;
    text-align: left;

    @media (max-width: 600px) {
        font-size: 1rem;
        text-align: center;
    }
`;

const Layout = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #f9fafb;
    padding: 2rem 0;

    @media (max-width: 600px) {
        padding: 1rem 0;
    }
`;

const ContentContainer = styled.div`
    width: 100%;
    max-width: 350px; /* 통일! */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0; // <= padding 제거
    box-sizing: border-box;

    @media (max-width: 600px) {
        max-width: 98vw; /* 모바일에서는 화면 거의 꽉 차게 */
        padding: 0 0.5rem;
    }
`;

const FooterButton = styled.button`
    width: 100%;
    max-width: 350px;
    padding: 1rem 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: #fff;
    background: #6366f1;
    border: none;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    cursor: pointer;
    transition: background 0.18s, box-shadow 0.18s;

    &:hover,
    &:focus {
        background: #4f46e5;
        outline: none;
    }

    &:active {
        background: #4338ca;
    }

    @media (max-width: 600px) {
        max-width: 98vw;
        padding: 0.8rem 0;
        font-size: 1rem;
    }
`;

const ModalImage = styled.img`
    width: 100%;
    max-width: 350px; /* 통일! */
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    object-fit: cover;
    display: block;

    @media (max-width: 600px) {
        max-width: 98vw;
    }
`;

const FileUploader = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [resultUrl, setResultUrl] = useState(null);
    const [resultBlob, setResultBlob] = useState(null);
    const [loading, setLoading] = useState(false);
    const backend = import.meta.env.VITE_API_URL;

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);

            if (selectedFile.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result);
                };
                reader.readAsDataURL(selectedFile);
            }
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setLoading(true); // 업로드 시작 시 로딩 활성화

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(`${backend}`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('업로드 실패');
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setResultUrl(url);
            setResultBlob(blob);

            setFile(null);
            setPreview(null);
        } catch (error) {
            console.error('오류 발생:', error);
            alert('업로드 중 오류가 발생했습니다.');
        } finally {
            setLoading(false); // 업로드 종료 시 로딩 비활성화
        }
    };

    const handleDownload = () => {
        if (!resultBlob) return;
        const url = URL.createObjectURL(resultBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'translated-image.png';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    };

    return (
        <Layout>
            <ContentContainer>
                <Slogan>
                    만화, 이제 AI가 바로 번역해 드려요!
                </Slogan>
                <SubText>
                    쉽고 빠른 만화 번역, 감동을 실시간으로
                    경험하세요.
                </SubText>
                {!file && (
                    <UploaderForm
                        onChange={handleFileChange}
                        preview={preview}
                    />
                )}
                {file && (
                    <>
                        <StyledImage
                            src={preview}
                            alt='미리보기'
                        />
                        <FileInfoCard>
                            <FileIcon>
                                <FaRegImage />
                            </FileIcon>
                            <FileDetails>
                                <span className='filename'>
                                    {file.name}
                                </span>
                                <span className='meta'>
                                    {formatFileSize(
                                        file.size
                                    )}
                                </span>
                            </FileDetails>
                        </FileInfoCard>
                        <UploadButton
                            onClick={handleUpload}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Spinner />
                                    번역 중...
                                </>
                            ) : (
                                '번역하기'
                            )}
                        </UploadButton>
                    </>
                )}
                {resultUrl && (
                    <div
                        style={{
                            marginTop: 32,
                            textAlign: 'center',
                        }}
                    >
                        <ModalImage
                            src={resultUrl}
                            alt='번역 결과 미리보기'
                        />
                        <div style={{ marginTop: 16 }}>
                            <FooterButton
                                onClick={handleDownload}
                            >
                                번역 이미지 다운로드
                            </FooterButton>
                        </div>
                    </div>
                )}
            </ContentContainer>
        </Layout>
    );
};

export default FileUploader;
