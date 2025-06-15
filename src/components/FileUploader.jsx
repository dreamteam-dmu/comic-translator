import { useState } from 'react';
import styled from 'styled-components';
import UploaderForm from './UploaderForm';
import { UploadButton } from './UploadButton';
import { FaRegImage } from 'react-icons/fa';
import { formatFileSize } from '../utils/formatFileSize';
import sample from '../assets/sample.png';

const ModalFooter = styled.div`
    display: flex;
    width: 100%;
    border-top: 1px solid #ececec;
    background: #fff;
    position: absolute;
    left: 0;
    bottom: 0;
    border-radius: 0 0 16px 16px;
    overflow: hidden;
`;

const FooterButton = styled.button`
    flex: 1;
    padding: 1rem 0;
    font-size: 1.07rem;
    font-weight: 500;
    border: none;
    background: ${({ primary }) =>
        primary ? '#222' : '#f6f6f6'};
    color: ${({ primary }) => (primary ? '#fff' : '#666')};
    cursor: pointer;
    transition: background 0.15s;
    border-right: ${({ primary }) =>
        primary ? 'none' : '1px solid #ececec'};

    &:active {
        background: ${({ primary }) =>
            primary ? '#111' : '#ececec'};
    }
`;

const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.35);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.16);
    padding: 1.5rem; /* 상단 패딩을 2.5rem 이상으로 */
    max-width: 80vw;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`;

const ModalImage = styled.img`
    width: 100%;
    max-width: 320px;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    object-fit: cover;
    margin-bottom: 1.2rem;
    margin-top: 1.5rem; /* 상단에 여유를 줌 */
    box-sizing: border-box;
    padding: 0 10px;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.6rem;
    color: #888;
    cursor: pointer;
    z-index: 2; /* 혹시 모를 겹침 방지 */
    transition: color 0.2s;
    &:hover {
        color: #333;
    }
`;

const FileInfoCard = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
    gap: 1rem;
    background: #fff;
    border: 1.5px solid #e5e7eb;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    padding: 1.2rem 1.5rem;
    box-sizing: border-box;
    width: 100%;
    max-width: 420px;
    margin-left: auto;
    margin-right: auto;
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
`;

const Slogan = styled.h1`
    font-size: 1.7rem;
    font-weight: 700;
    color: #222;
    margin: 0px;
    line-height: 1.3;
    text-align: left;
    letter-spacing: -0.02em;
    word-break: keep-all;
    overflow-wrap: break-word;

    @media (max-width: 600px) {
        font-size: 1.5rem;
        text-align: center;
    }
`;

const SubText = styled.p`
    font-size: 1.1rem;
    color: #666;
    text-align: left;
    word-break: keep-all;
    overflow-wrap: break-word;

    @media (max-width: 600px) {
        text-align: center;
    }
`;

const FileDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    min-width: 0;
    flex: 1;
    word-break: keep-all;
    overflow-wrap: break-word;

    .filename,
    .meta {
        font-size: 1.05rem;
        color: #222;
        white-space: normal;
        word-break: keep-all;
        overflow-wrap: break-word;
        /* 필요하다면 text-overflow, overflow, white-space 속성 조정 */
    }
`;

const Layout = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #f9fafb;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

const ContentContainer = styled.div`
    width: 100%;
    max-width: 420px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    padding: 0 1rem;
    box-sizing: border-box;
    align-items: center;
`;

const FileUploader = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [showModal, setShowModal] = useState(true); // 최초 접속 시 모달 보임

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);

            // 이미지 파일이면 미리보기 생성
            if (selectedFile.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result);
                };
                reader.readAsDataURL(selectedFile);
            } else {
                setPreview(null);
            }
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);

        await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });
        alert('업로드 완료!');
        setFile(null);
        setPreview(null);
    };

    return (
        <Layout>
            {showModal && (
                <ModalBackdrop>
                    <ModalContent>
                        <CloseButton
                            onClick={() =>
                                setShowModal(false)
                            }
                            aria-label='닫기'
                        >
                            ×
                        </CloseButton>
                        <ModalImage
                            src={sample}
                            alt='예시 이미지'
                        />
                        <div
                            style={{
                                textAlign: 'center',
                                color: '#333',
                                fontSize: '1.05rem',
                            }}
                        >
                            원본 만화와 번역본을 한눈에
                            비교해보세요. <br />
                            AI가 대사를 한국어로 전달해
                            드립니다. <br />
                            지금 바로 AI 번역으로 새롭게
                            만나보세요!
                        </div>
                    </ModalContent>
                </ModalBackdrop>
            )}

            <ContentContainer>
                <Slogan>
                    만화, 이제 AI가 바로 번역해 드려요!
                </Slogan>
                <SubText>
                    쉽고 빠른 만화 번역, 감동을 실시간으로
                    경험하세요.
                </SubText>
                {/* <StyledImage src={sample} alt='예시' /> 삭제 */}
                <UploaderForm
                    onChange={handleFileChange}
                    preview={preview}
                />
                {file && (
                    <>
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
                        >
                            업로드
                        </UploadButton>
                    </>
                )}
            </ContentContainer>
        </Layout>
    );
};

export default FileUploader;
