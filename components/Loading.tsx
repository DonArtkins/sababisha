import { Player } from '@lottiefiles/react-lottie-player';

export function Loading() {
  return (
    <div className="fixed inset-0 bg-[#EFEFEF] z-50 flex flex-col items-center justify-center">
      <Player
        autoplay
        loop
        src="https://assets3.lottiefiles.com/packages/lf20_b8jncxx6.json" // Loading animation
        style={{ height: '200px', width: '200px' }}
      />
    </div>
  );
}
