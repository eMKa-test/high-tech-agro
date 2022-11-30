import {memo} from "react";
import {useTheme} from "@material-ui/styles";
import {Box} from "@material-ui/core";
import CustomLink from "../../components/inputs/CustomLink";

function ForgotPassword() {
  const {props: colorTheme} = useTheme();

  return (
    <Box mt={3}>
      <CustomLink
        type="link"
        fontSize={14}
        fontWeight={300}
        underline="hover"
        color={colorTheme.ORANGE.main}>
        Забыли пароль?
      </CustomLink>
    </Box>
  );
}

export default memo(ForgotPassword);
