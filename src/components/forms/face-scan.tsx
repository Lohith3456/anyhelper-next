"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, MoveUp, MoveDown, MoveLeft, MoveRight } from 'lucide-react';
import { Progress } from '../ui/progress';

interface FaceScanProps {
  onScanComplete: () => void;
}

const scanSteps = [
  { instruction: "Look straight ahead", duration: 3, icon: <CheckCircle className="h-8 w-8" /> },
  { instruction: "Slowly turn your head to the right", duration: 3, icon: <MoveRight className="h-8 w-8" /> },
  { instruction: "Slowly turn your head to the left", duration: 3, icon: <MoveLeft className="h-8 w-8" /> },
  { instruction: "Slowly look up", duration: 2, icon: <MoveUp className="h-8 w-8" /> },
  { instruction: "Slowly look down", duration: 2, icon: <MoveDown className="h-8 w-8" /> },
];

export function FaceScan({ onScanComplete }: FaceScanProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | undefined>(undefined);
  const [scanStep, setScanStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  const getCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setHasCameraPermission(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      return stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasCameraPermission(false);
      toast({
        variant: 'destructive',
        title: 'Camera Access Denied',
        description: 'Please enable camera permissions in your browser settings.',
      });
      return null;
    }
  };

  const startScan = async () => {
    const stream = await getCameraPermission();
    if (stream) {
      setIsScanning(true);
      setScanStep(0);
      setIsCompleted(false);
    }
  };

  const stopScan = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isScanning && scanStep < scanSteps.length) {
      timer = setTimeout(() => {
        setScanStep(prevStep => prevStep + 1);
      }, scanSteps[scanStep].duration * 1000);
    } else if (isScanning && scanStep >= scanSteps.length) {
      setIsCompleted(true);
      stopScan();
      onScanComplete();
      toast({
        title: 'Scan Complete!',
        description: 'Your identity has been successfully verified.',
        className: 'bg-green-500 text-white'
      });
    }

    return () => {
      clearTimeout(timer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScanning, scanStep]);

  useEffect(() => {
    // Cleanup camera on component unmount
    return () => stopScan();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isCompleted) {
    return (
      <div className="flex items-center gap-2 p-4 rounded-md bg-green-100 text-green-800 border border-green-200">
        <CheckCircle className="h-6 w-6" />
        <p className="font-medium">Verification Complete</p>
      </div>
    );
  }

  if (isScanning) {
    const currentStep = scanSteps[scanStep];
    const progressPercentage = ((scanStep + 1) / scanSteps.length) * 100;
    
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-full max-w-sm aspect-square rounded-full overflow-hidden border-4 border-primary">
          <video ref={videoRef} className="w-full h-full object-cover scale-x-[-1]" autoPlay muted playsInline />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            {currentStep && (
              <div className="text-center text-white p-4 bg-black/50 rounded-lg">
                <div className="flex justify-center mb-2">{currentStep.icon}</div>
                <p className="font-semibold text-lg">{currentStep.instruction}</p>
              </div>
            )}
          </div>
        </div>
        <Progress value={progressPercentage} className="w-full max-w-sm" />
        <Button variant="destructive" onClick={stopScan}>Cancel Scan</Button>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {hasCameraPermission === false && (
        <Alert variant="destructive">
          <AlertTitle>Camera Access Required</AlertTitle>
          <AlertDescription>
            Facial verification requires camera access. Please allow camera permissions in your browser settings and refresh the page.
          </AlertDescription>
        </Alert>
      )}
      <Button onClick={startScan} disabled={hasCameraPermission === false}>
        Start Face Scan
      </Button>
    </div>
  );
}
