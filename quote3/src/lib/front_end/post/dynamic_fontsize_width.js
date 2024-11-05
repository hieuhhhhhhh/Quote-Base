const base = 25;
const min = 17;
const linesAtMin = 7;

const maxWidth = 460;
const minWidth = 110;

const update_FontSize_Width = (text, setFontSize, setWidth) => {
  const { lines, max } = countLines(text);
  console.log("Lines: ", lines);
  const size = base - (lines / linesAtMin) * (base - min);

  const width = minWidth + (maxWidth - minWidth) * (max / 39);

  setFontSize(`${Math.max(size, min)}px`);
  setWidth(`${Math.min(width, maxWidth)}px`);
};

const countLines = (text) => {
  const subs = text.split("\n");
  let max = 0;
  let lines = 0;

  for (const sub of subs) {
    if (sub.length > max) {
      max = sub.length;
    }
    lines += 1 + Math.floor(sub.length / (28 + lines));
  }

  return { lines, max };
};

export default update_FontSize_Width;
