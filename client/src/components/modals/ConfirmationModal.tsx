import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { ReactNode } from "react";

interface ConfirmationModalProps {
  /**
   * Controls whether the modal is open
   */
  isOpen: boolean;
  /**
   * The title of the confirmation modal
   */
  title: string;
  /**
   * The description/message of the confirmation modal
   */
  description: string | ReactNode;
  /**
   * Optional custom text for the confirm button
   * @default "Confirm"
   */
  confirmText?: string;
  /**
   * Optional custom text for the cancel button
   * @default "Cancel"
   */
  cancelText?: string;
  /**
   * Optional variant for the confirm button
   * @default "destructive"
   */
  confirmVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  /**
   * Function to call when the confirm button is clicked
   */
  onConfirm: () => void;
  /**
   * Function to call when the modal is closed
   */
  onClose: () => void;
}

/**
 * A reusable confirmation modal component using shadcn UI
 */
export const ConfirmationModal = ({
  isOpen,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmVariant = "destructive",
  onConfirm,
  onClose,
}: ConfirmationModalProps) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="max-w-md bg-[#0f1729] border-[#164e63]/30">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[#ecfeff]">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-[#94a3b8]">{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel className="bg-[#1e293b] border-[#164e63]/30 text-[#ecfeff] hover:bg-[#334155]">{cancelText}</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className={`${
              confirmVariant === "destructive"
                ? "bg-red-600 hover:bg-red-700"
                : ""
            }`}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
