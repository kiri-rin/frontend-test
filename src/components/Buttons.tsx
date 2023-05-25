import { CButton, CSpinner } from "@coreui/react";
import { CButtonProps } from "@coreui/react/dist/components/button/CButton";

export const LoadingButton = ({
  children,
  isLoading,
  ...props
}: CButtonProps & { isLoading?: boolean }) => {
  return (
    <CButton {...props} disabled={props.disabled || isLoading}>
      {isLoading && <CSpinner size={"sm"} />}
      {children}
    </CButton>
  );
};
