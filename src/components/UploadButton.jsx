import styled from 'styled-components';

export const UploadButton = styled.button`
    width: 100%;
    margin-top: 20px;
    max-width: 420px;
    padding: 1rem 0;
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
`;
