"use client";

import React, { useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface FileUploadButtonProps {
  form: UseFormReturn<any>;
  name: string;
  buttonText?: string;
}

export function FileUploadButton({ 
  form, 
  name,
  buttonText = "Upload File" 
}: FileUploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      form.setValue(name, event.target.files, { shouldValidate: true });
    } else {
      setFileName(null);
      form.setValue(name, null, { shouldValidate: true });
    }
  };

  const handleRemoveFile = () => {
    setFileName(null);
    form.setValue(name, null, { shouldValidate: true });
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  const { ref, ...field } = form.register(name);

  return (
    <div className="flex items-center gap-2">
      <Input
        type="file"
        className="hidden"
        ref={(e) => {
          ref(e)
          if(inputRef) {
            (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = e;
          }
        }}
        {...field}
        onChange={onFileChange}
      />
      {!fileName && (
        <Button 
          type="button" 
          variant="outline"
          onClick={() => inputRef.current?.click()}
        >
          {buttonText}
        </Button>
      )}
      {fileName && (
        <Badge variant="secondary" className="flex items-center gap-2">
          <span className="max-w-[150px] truncate">{fileName}</span>
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 p-0"
            onClick={handleRemoveFile}
          >
            <X className="h-3 w-3"/>
          </Button>
        </Badge>
      )}
    </div>
  );
}