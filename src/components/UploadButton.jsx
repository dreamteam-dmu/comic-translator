// UploadButton.jsx

import styled from 'styled-components';

export const UploadButton = styled.button`
    width: 100%;
    max-width: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
    margin-top: 28px;
    font-size: 1.1rem;
    font-weight: 600;
    color: #4b5563;
    background: #fff;
    border: 1.5px solid #e5e7eb;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    cursor: pointer;
    transition: background 0.18s, box-shadow 0.18s,
        color 0.18s, border 0.18s;

    &:hover,
    &:focus {
        background: #f3f4f6;
        color: #2563eb;
        border-color: #c7d2fe;
        box-shadow: 0 4px 16px rgba(37, 99, 235, 0.08);
        outline: none;
    }

    &:active {
        background: #e5e7eb;
        color: #1e293b;
        border-color: #a5b4fc;
    }

    &:disabled {
        cursor: not-allowed;
    }

    @media (max-width: 600px) {
        max-width: 98vw;
        padding: 0.8rem 0;
        font-size: 1rem;
    }
`;
