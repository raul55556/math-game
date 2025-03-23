export const createAudioContext = () => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    return new AudioContext();
};
