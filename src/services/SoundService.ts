class SoundService {
  private sounds: Map<string, HTMLAudioElement>;
  private initialized: boolean;

  constructor() {
    this.sounds = new Map();
    this.initialized = false;
  }

  async init() {
    if (this.initialized) return;

    const soundFiles = {
      beep: '/sounds/beep.wav',indows Background.wav',
      success: '/sounds/success.wav',.wav',
      error: '/sounds/error.wav'windows Error.wav'
    };

    try {
      for (const [name, path] of Object.entries(soundFiles)) {
        const audio = new Audio(path);
        this.sounds.set(name, audio);
      }
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize sounds:', error);
    }
  }

  play(soundName: string) {
    const sound = this.sounds.get(soundName);
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(error => 
        console.warn(`Failed to play sound: ${error}`)
      );
    }
  }
}

export const soundService = new SoundService();
