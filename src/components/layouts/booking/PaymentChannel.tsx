import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { Label } from '~/components/ui/label';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip';

const paymentChannels = [
  {
    id: 'vn_pay',
    name: 'VN Pay',
    image: '/images/vn_pay.png',
    isEnabled: true,
  },
  {
    id: 'stripe',
    name: 'Stripe',
    image: '/images/stripe.png',
    isEnabled: false,
  },
  // {
  //   id: 'momo',
  //   name: 'Momo',
  //   image: '/images/momo.png',
  //   isEnabled: false,
  // },
  {
    id: 'paypal',
    name: 'Paypal',
    image: '/images/paypal.png',
    isEnabled: false,
  },
];

interface PaymentChannelProps {
  channel: string;
  setChannel: Dispatch<SetStateAction<string>>;
}

export default function PaymentChannel({ channel, setChannel }: PaymentChannelProps) {
  return (
    <div>
      <h3 className="mb-6 text-xl font-semibold">Select your payment method</h3>
      <RadioGroup defaultValue={channel} className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {paymentChannels.map((channel) => (
          <TooltipProvider key={channel.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="curser-pointer flex-center space-x-5 rounded-md border border-transparent p-2 hover:border-primary/30 has-[button[data-state=checked]]:border-indigo-500 has-[button:disabled]:opacity-50">
                  <RadioGroupItem
                    value={channel.id}
                    id={channel.id}
                    className="hidden"
                    disabled={!channel.isEnabled}
                    onChange={() => setChannel(channel.id)}
                  />
                  <Label htmlFor={channel.id} className="flex-center !m-0">
                    <div className="relative aspect-square h-44 overflow-hidden">
                      <Image
                        src={channel.image}
                        alt={channel.name}
                        priority
                        fill
                        className="cursor-pointer object-contain"
                      />
                      {/* <img src={channel.image} alt={channel.name} className="cursor-pointer object-contain" /> */}
                    </div>
                    {/* <div className="text-lg font-semibold">{channel.name}</div> */}
                  </Label>
                </div>
              </TooltipTrigger>
              <TooltipContent>{channel.name}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </RadioGroup>
    </div>
  );
}
