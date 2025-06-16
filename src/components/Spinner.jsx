// Spinner.jsx
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    0% { transform: rotate(0deg);}
    100% { transform: rotate(360deg);}
`;

export const Spinner = styled.div`
    display: inline-block;
    width: 22px;
    height: 22px;
    border: 3px solid #e5e7eb;
    border-top: 3px solid #6366f1;
    border-radius: 50%;
    animation: ${spin} 0.8s linear infinite;
    vertical-align: middle;
    margin-right: 8px;
`;
