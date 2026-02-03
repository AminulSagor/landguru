import Card from "@/components/cards/card";
import Dialog from "@/components/dialogs/dialog";
import Image from "next/image";
type Props = {
  success: boolean;
  setSuccess: (v: boolean) => void;
};
const SubmitSuccessDialog = ({ success, setSuccess }: Props) => {
  return (
    <Dialog open={success} onOpenChange={setSuccess} position="top" size="sm">
      <div className="space-y-3 flex items-center flex-col">
        <Image
          src={"/images/submit-success.png"}
          height={100}
          width={120}
          alt="success-image"
        />
        <p className="text-base text-center">Submitted for Review</p>
        <p className="text-primary text-xs text-center">
          Your submission wil be reviewed <br /> by your assigned admin soon
        </p>
        <Card className="rounded-xl">
          <h3 className="text-xs text-gray">SERVICE TYPE</h3>
          <h1 className="text-base">Ownership history validation</h1>
          <p className="text-gray text-xs">#SERV892-POST-1042</p>
        </Card>
      </div>
    </Dialog>
  );
};

export default SubmitSuccessDialog;
