import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type linkButtonProps = {
  text: string;
  linkTo?: string;
  testId?: string;
  disabled: boolean;
  onClick?: () => void;
};

export const LinkButton = ({ testId, text, linkTo, ...props }: linkButtonProps) => {
  const handleClick = useNavigate();

  return (
    <Button
      data-testid={testId}
      {...props}
      onClick={() => {
        if (linkTo) {
          handleClick(linkTo);
        } else {
          props.onClick && props.onClick();
        }
      }}
      className={`bg-transparent text-black hover:bg-gray-100 p-0 m-0 h-fit w-fit`}
    >
      <p className="p-2">{text}</p>
    </Button>
  );
};