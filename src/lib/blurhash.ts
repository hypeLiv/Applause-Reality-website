import { decode } from "blurhash";
import { deflateSync } from "node:zlib";

/** Longest side of the decoded placeholder; next/image blurs and stretches it to fill. */
const SIZE = 8;

const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function crc32(buf: Buffer) {
  let c = 0xffffffff;
  for (const byte of buf) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type: string, data: Buffer) {
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

/** A minimal RGB PNG; enough for a few-pixel placeholder without pulling in an image library. */
function png(rgba: Uint8ClampedArray, width: number, height: number) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // colour type: RGB
  const rows = Buffer.alloc((width * 3 + 1) * height);
  for (let y = 0; y < height; y++) {
    const row = y * (width * 3 + 1); // first byte of each row is the filter type (0 = none)
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      rows.set([rgba[i], rgba[i + 1], rgba[i + 2]], row + 1 + x * 3);
    }
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(rows)),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/** Decodes a BlurHash into a PNG data URL sized to the image's aspect ratio, for next/image's blurDataURL. */
export function blurhashToDataURL(hash: string, width: number, height: number) {
  const scale = SIZE / Math.max(width, height, 1);
  const w = Math.max(1, Math.round(width * scale));
  const h = Math.max(1, Math.round(height * scale));
  return `data:image/png;base64,${png(decode(hash, w, h), w, h).toString("base64")}`;
}
