import { useIntl } from "react-intl";

export const useFormatIntl = () => {
  const intl = useIntl();

  const format = (id: string) => {
    return intl.formatMessage({ id });
  };

  return {
    format,
  };
};
