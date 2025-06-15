import React, { useState } from 'react';
import styled from 'styled-components';

const UploaderForm = ({ onChange, preview }) => {
    const [dragActive, setDragActive] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (
            e.dataTransfer.files &&
            e.dataTransfer.files.length > 0
        ) {
            onChange({
                target: { files: e.dataTransfer.files },
            });
        }
    };

    return (
        <StyledWrapper>
            <label
                htmlFor='file'
                className={`custum-file-upload${
                    dragActive ? ' drag-active' : ''
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className='icon'>
                    {preview ? (
                        <img src={preview} alt='미리보기' />
                    ) : (
                        <>
                            <svg
                                viewBox='0 0 24 24'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <g id='SVGRepo_iconCarrier'>
                                    <path
                                        fillRule='evenodd'
                                        clipRule='evenodd'
                                        d='M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z'
                                    />
                                </g>
                            </svg>
                            <div className='text'>
                                <span>
                                    드래그 또는 클릭하여
                                    파일 업로드
                                </span>
                            </div>
                        </>
                    )}
                </div>
                <input
                    id='file'
                    type='file'
                    onChange={onChange}
                />
            </label>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    width: 100%;
    max-width: 420px;
    margin-top: 20px;

    .custum-file-upload {
        height: 250px;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
        cursor: pointer;
        border: 2px dashed #cacaca;
        background-color: #fff;
        padding: 1.5rem;
        border-radius: 10px;
        box-shadow: 0px 48px 35px -48px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        position: relative;
    }

    .custum-file-upload.drag-active {
        border-color: #3b82f6;
        background-color: #f0f8ff;
        box-shadow: 0px 0px 10px 2px #3b82f655;
    }

    .custum-file-upload .icon {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        flex-direction: column;
        gap: 20px;
    }

    .custum-file-upload .icon img {
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
        object-fit: contain;
        border-radius: 8px;
    }

    .custum-file-upload .icon svg {
        width: 80px;
        height: 80px;
        fill: rgba(75, 85, 99, 1);
    }

    .custum-file-upload .text {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .custum-file-upload .text span {
        font-weight: 400;
        color: rgba(75, 85, 99, 1);
        font-size: 1rem;
    }

    .custum-file-upload input {
        display: none;
    }
`;

export default UploaderForm;
