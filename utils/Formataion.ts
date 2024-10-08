export function FormatLogoIfNoImage(name: string): string{
    const formatedIconEmptyImage = name.trim();
    return formatedIconEmptyImage.charAt(0).toUpperCase();
}