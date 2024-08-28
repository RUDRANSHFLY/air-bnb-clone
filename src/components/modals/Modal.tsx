"use client";

import { cn } from "@/lib/utils";
import React, { ReactElement, useState, useEffect, useCallback } from "react";
import { Button } from "../ui/button";
import { CircleX, CrossIcon } from "lucide-react";
import ButtonHelper from "../helper/ButtonHelper";

interface ModalProps {
  isOpen?: boolean;
  onCLose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: ReactElement;
  footer?: ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal = ({
  actionLabel,
  onCLose,
  onSubmit,
  secondaryActionLabel,
  body,
  disabled,
  footer,
  isOpen,
  secondaryAction,
  title,
}: ModalProps) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(isOpen || true);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onCLose();
    }, 200);
  }, [disabled, onCLose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={
        "justify-center items-center flex overflow-x-hidden overflow-y-scroll scrollbar-hide fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70"
      }
    >
      <div
        className={
          "relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5  mx-auto h-full lg:h-auto md:h-auto"
        }
      >
        {/*content*/}
        <div
          className={cn(
            `duration-200 h-full ${
              showModal
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            }`
          )}
        >
          <div
            className={
              "h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
            }
          >
            {/*header*/}
            <div
              className={
                "relative flex justify-center items-center p-6 rounded-t border-b-[1px]"
              }
            >
              <Button
                variant={"link"}
                onClick={handleClose}
                className={"absolute right-9"}
              >
                <CircleX size={24} />
              </Button>
              <div className={"text-lg font-semibold "}>{title}</div>
            </div>
            {/*body*/}
            <div className={"relative flex-auto"}>{body}</div>
            {/*footer*/}
            <div className={"flex flex-col gap-2 p-6"}>
              <div className={"flex flex-row items-center gap-4 w-full"}>
                {secondaryAction && secondaryActionLabel && (
                  <ButtonHelper
                    outline
                    label={secondaryActionLabel}
                    disabled={disabled}
                    onClick={handleSecondaryAction}
                  />
                )}

                <ButtonHelper
                  label={actionLabel}
                  disabled={disabled}
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
