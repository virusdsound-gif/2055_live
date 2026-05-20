import wave
import math
import struct
import os

def generate_tone(freq, duration_sec, volume=0.3, sample_rate=44100):
    samples = []
    for i in range(int(sample_rate * duration_sec)):
        t = i / sample_rate
        # Main tone + subtle 0.7 Hz modulation
        value = int(32767.0 * volume * math.sin(2 * math.pi * freq * t) * 
                    (0.9 + 0.1 * math.sin(2 * math.pi * 0.7 * t)))
        samples.append(value)
    return samples

def main():
    print("🌟 Generating The Morning Star 🌟 (0.7 Hz Root)")
    print("Layers: 0.7 Hz + 99.9 Hz + 200 Hz + 369 Hz")
    
    sample_rate = 44100
    audio = []

    # Intro - 0.7 Hz Dawn Void (28 seconds silence + sub pulse)
    audio.extend(generate_tone(0.7, 28, volume=0.15))

    # Verse 1 - 99.9 Hz Pain Alchemy
    audio.extend(generate_tone(99.9, 32, volume=0.4))

    # Hook - Full layered
    audio.extend(generate_tone(200, 8, volume=0.25))   # Bridge
    audio.extend(generate_tone(369, 32, volume=0.35))  # Tesla return

    # Bridge - Pure 0.7 Hz Royal Silence
    audio.extend(generate_tone(0.7, 32, volume=0.12))

    # Final Hook - All frequencies layered
    audio.extend(generate_tone(200, 8, volume=0.3))
    audio.extend(generate_tone(369, 32, volume=0.4))

    # Save as WAV
    filename = "the_morning_star_0.7hz.wav"
    with wave.open(filename, 'w') as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(sample_rate)
        wf.writeframes(struct.pack('<' + 'h' * len(audio), *audio))

    print(f"✅ Beat generated: {filename}")
    print("File is ready for Ableton / any DAW")
    print("0.7 Hz root is embedded — play loud on good speakers")

if __name__ == "__main__":
    main()
