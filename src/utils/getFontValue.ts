export const remToPx = (value: string) => {
  return Math.round(parseFloat(value) * 16);
};

export function pxToRem(value: number) {
  return `${value / 16}rem`;
}

export const textTrim = (input: string, trimNumber: number) => {
  return input.length > trimNumber ? `${input.substr(0, trimNumber)}...` : input;
};

export const responsiveFontSizes = ({ sm, md, lg }: { sm: number; md: number; lg: number }) => {
  return {
    '@media (min-width:600px)': {
      fontSize: `${sm}rem`,
    },
    '@media (min-width:900px)': {
      fontSize: `${md}rem`,
    },
    '@media (min-width:1200px)': {
      fontSize: `${lg}rem`,
    },
  };
};
