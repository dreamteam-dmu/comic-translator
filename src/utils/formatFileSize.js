// 파일 사이즈 단위 변환 함수
export function formatFileSize(size) {
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB'];
    let unit = 0;
    let fileSize = size;
    while (fileSize >= 1024 && unit < units.length - 1) {
        fileSize /= 1024;
        unit++;
    }
    // bytes는 소수점 없이, 그 외는 소수점 한 자리
    const displaySize =
        unit === 0 ? fileSize : fileSize.toFixed(1);
    return `${displaySize} ${units[unit]}`;
}
