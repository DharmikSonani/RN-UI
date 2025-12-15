import { useEffect, useState } from 'react';
import { Image } from 'react-native';

const defaultDimensions = { width: 0, height: 0, aspectRatio: 1 };

export const useImageDimensions = (source) => {
    const [dimensions, setDimensions] = useState(defaultDimensions);

    useEffect(() => {
        if (!source) return;

        // Remote
        if (typeof source === 'object' && source?.uri) {
            Image.getSize(
                source?.uri,
                (width, height) =>
                    setDimensions({
                        width,
                        height,
                        aspectRatio: width / height,
                    }),
                () => setDimensions(defaultDimensions)
            );
        }
        // Local
        else {
            const asset = Image.resolveAssetSource(source);
            if (asset?.width && asset?.height) {
                setDimensions({
                    width: asset.width,
                    height: asset.height,
                    aspectRatio: asset.width / asset.height,
                });
            }
        }
    }, []);

    return { dimensions };
};
