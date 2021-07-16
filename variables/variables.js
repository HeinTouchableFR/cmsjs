export function presets() {
    const presettings = [];
    for (let i = 1; i < 7; i += 1) {
        const preset = {
        };
        preset.id = new Date().getTime() + i;
        preset.nbColumns = i;
        presettings.push(preset);
    }
    return presettings;
}

export const acceptImageExtension = JSON.stringify(['image/png',
    'image/bmp',
    'image/gif',
    'image/x-icon',
    'image/jpeg',
    'image/svg+xml',
    'image/tiff',
    'image/webp',
]);

export const acceptTextExtension = JSON.stringify(['text/css',
    'text/csv',
    'text/html',
    'text/calendar',
    'text/plain',
]);

export const acceptApplicationExtension = JSON.stringify(['application/octet-stream',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/javascript',
    'application/json',
    'application/vnd.oasis.opendocument.presentation',
    'application/vnd.oasis.opendocument.spreadsheet',
    'application/vnd.oasis.opendocument.text',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/x-rar-compressed',
    'application/typescript',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/xml',
    'application/zip',
    'application/x-7z-compressed',
    'application/pdf',
]);

export const acceptVideoExtension = JSON.stringify(['application/octet-stream',
    'video/mpeg',
    'video/ogg',
    'video/webm',
    'video/mp4',
    'video/h261',
    'video/h263',
    'video/h264',
    'video/quicktime',
    'video/x-msvideo',
]);

export const acceptAudioExtension = JSON.stringify(['application/octet-stream',
    'audio/mid',
    'audio/mpeg',
    'audio/mp4',
    'audio/vnd.wav',
]);
