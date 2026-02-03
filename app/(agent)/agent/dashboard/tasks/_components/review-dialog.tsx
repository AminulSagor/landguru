import Button from "@/components/buttons/button";
import Dialog from "@/components/dialogs/dialog";
type Props = {
  review: boolean;
  setReview: (v: boolean) => void;
  setSuccess: (v: boolean) => void;
};
const ReviewDialog = ({ review, setReview, setSuccess }: Props) => {
  return (
    <Dialog open={review} onOpenChange={setReview} size="sm">
      <div className="space-y-3">
        <h1 className="text-base">Are You sure ? </h1>
        <p className="text-gray text-xs">
          Once you submit for review, you won’t be able to submit your work log
          later. Admin will review your submission later on.
        </p>
        <div className="flex gap-2 items-center">
          <Button
            variant="primary"
            className="w-full"
            onClick={() => {
              setReview(false);
              setSuccess(true);
            }}
          >
            Yes
          </Button>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => setReview(false)}
          >
            Cencel
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ReviewDialog;
