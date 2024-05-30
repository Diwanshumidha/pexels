// file: /components/GrowingTextArea.tsx

import { Textarea, TextareaProps } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

type ExtraProps = {
  maxHeight?: number;
  maxLength?: number;
};

type GrowingTextAreaProps = TextareaProps & ExtraProps;

const GrowingTextArea: React.FC<GrowingTextAreaProps> = ({
  maxHeight = 200,
  maxLength = Infinity,
  className,
  ...props
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textLengthDetails, setTextLengthDetails] = useState<{
    length: number;
    color: string;
  }>({ color: "black", length: 0 });

  const getTextLengthDetails = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const length = e.currentTarget.value.length;
    const percentage = (length / maxLength) * 100;
    let color = "black";

    if (percentage > 80) {
      color = "red";
    } else if (percentage > 60) {
      color = "orange";
    } else if (percentage > 20) {
      color = "green";
    }

    setTextLengthDetails({
      length,
      color,
    });
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
      textarea.style.height = `${newHeight}px`;
    }
  }, [props.value, maxHeight]);

  return (
    <div className="relative">
      <Textarea
        {...props}
        ref={textareaRef}
        onInput={getTextLengthDetails}
        maxLength={maxLength}
        className={cn("resize-none", className)}
      />
      <p
        className={cn(
          maxLength === Infinity ? "hidden" : "",
          textLengthDetails.length === 0 ? "hidden" : "",
          "absolute right-2 bottom-1 text-xs"
        )}
        style={{ color: textLengthDetails.color }}
      >
        {textLengthDetails.length} / {maxLength}
      </p>
    </div>
  );
};

export default GrowingTextArea;
