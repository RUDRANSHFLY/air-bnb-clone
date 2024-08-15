"use client";

import React, { ReactElement, useState, useEffect, useCallback } from "react";

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
  secondaryLabel: string;
}

const Modal = ({
  actionLabel,
  onCLose,
  onSubmit,
  secondaryLabel,
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

    onCLose();
  }, [disabled, onCLose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondary = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

  return (
    <>
      <div className={""}></div>
    </>
  );
};

export default Modal;
