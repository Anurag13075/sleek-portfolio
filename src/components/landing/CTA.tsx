'use client';

import { ctaConfig } from '@/config/CTA';
import { useHapticFeedback } from '@/hooks/use-haptic-feedback';
import Cal, { getCalApi } from '@calcom/embed-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import Container from '../common/Container';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

interface CallToActionProps {
  profileImage?: string;
  profileAlt?: string;
  linkText?: string;
  calLink?: string;
  preText?: string;
}

export default function CTA({
  profileImage = ctaConfig.profileImage,
  profileAlt = ctaConfig.profileAlt,
  linkText = ctaConfig.linkText,
  calLink = ctaConfig.calLink,
  preText = ctaConfig.preText,
}: CallToActionProps) {
  const { triggerHaptic, isMobile } = useHapticFeedback();
  const [showCalPopup, setShowCalPopup] = useState(false);

  useEffect(() => {
    const cal = async () => {
      try {
        const calApi = await getCalApi();
        if (calApi) {
          calApi('on', {
            action: 'bookingSuccessful',
            callback: () => {
              setShowCalPopup(false);
            },
          });
        }
      } catch (error) {
        console.error('Failed to initialize Cal API:', error);
      }
    };
    cal();
  }, []);

  const handleButtonClick = () => {
    if (isMobile()) {
      triggerHaptic('medium');
    }
    setShowCalPopup(true);
  };

  return (
    <>
      <Container className="home-cta">
        <div className="relative z-10 flex w-full flex-col text-left sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <h3 className="text-2xl font-medium tracking-tight text-foreground">
            {preText}
          </h3>
          <div className="mt-5 flex w-full justify-start sm:mt-0 sm:w-auto">
            <div
              className="button-primary cursor-pointer"
              onClick={handleButtonClick}
            >
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 flex-shrink-0 overflow-hidden rounded-full border-2 border-primary-foreground/20">
                  <Image
                    alt={profileAlt}
                    width={24}
                    height={24}
                    className="h-full w-full object-cover"
                    src={profileImage}
                  />
                </div>
                <span className="block text-base tracking-wide">
                  {linkText}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Cal.com Dialog */}
      <Dialog open={showCalPopup} onOpenChange={setShowCalPopup}>
        <DialogContent className="max-h-[90vh] max-w-[calc(100vw-2rem)] overflow-hidden sm:max-w-[calc(100vw-4rem)] md:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Book a Meeting</DialogTitle>
            <DialogDescription>
              Schedule a time to connect and discuss opportunities
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-[calc(90vh-220px)] overflow-y-auto rounded-lg">
            <Cal
              calLink={calLink}
              config={{
                name: 'Portfolio Visitor',
                email: '',
                notes: 'Booked from portfolio website',
              }}
              className="h-[500px] w-full rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
