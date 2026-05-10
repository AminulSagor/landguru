import Card from "@/components/cards/card";
import Dialog from "@/components/dialogs/dialog";
import Image from "next/image";
type Props = {
  success: boolean;
  setSuccess: (v: boolean) => void;
  serviceType?: string;
  title?: string;
  refId?: string;
};
const SubmitSuccessDialog = ({
  success,
  setSuccess,
  serviceType = "SERVICE TYPE",
  title = "—",
  refId = "—",
}: Props) => {
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
          <h3 className="text-xs text-gray">{serviceType}</h3>
          <h1 className="text-base">{title}</h1>
          <p className="text-gray text-xs">{refId}</p>
        </Card>
      </div>
    </Dialog>
  );
};

export default SubmitSuccessDialog;
