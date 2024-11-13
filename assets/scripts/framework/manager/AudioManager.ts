/*
 * @Author: JL
 * @Date: 2024-11-12 16:46:24
 */
import { AudioClip, AudioSource, director, Node, resources } from "cc";

export default class AudioManager {

    private _audioSource: AudioSource = null;
    private bgmVolume = 1.0;
    private effectVolume = 1.0;
    private isOpenMusic = true;
    private isOpenEffect = true;

    public async setup() {
        if (this._audioSource == null) {
            let audioMgr = new Node();
            audioMgr.name = '__audioMgr__';
            director.getScene().addChild(audioMgr);
            director.addPersistRootNode(audioMgr);
            this._audioSource = audioMgr.addComponent(AudioSource);
        }
        GFM.LogMgr.log("AudioManager setup");
    }

    public get audioSource(): AudioSource {
        return this._audioSource;
    }

    setVolume(num: number) {
        this.bgmVolume = num;
        this.effectVolume = num;
        const isOpen = (num != 0);

        let music = this.isOpenMusic
        this.isOpenMusic = isOpen;
        this.isOpenEffect = isOpen;

        this._audioSource.volume = this.bgmVolume;
        if (isOpen && !music) {
            GFM.LogMgr.log('开启背景音乐');
            this._audioSource.play();
        }
    }


    playEffect(sound: AudioClip | string, volume: number = this.effectVolume) {
        if (sound instanceof AudioClip) {
            this._audioSource.playOneShot(sound, volume);
        }
        else {
            resources.load(sound, (err, clip: AudioClip) => {
                if (err) {
                    console.log(err);
                }
                else {
                    this._audioSource.playOneShot(clip, volume);
                }
            });
        }
    }


    playBGM(sound: AudioClip | string, volume: number = this.bgmVolume) {
        if (sound instanceof AudioClip) {
            this._audioSource.clip = sound;
            this._audioSource.play();
            this.audioSource.volume = volume;
        }
        else {
            resources.load(sound, (err, clip: AudioClip) => {
                if (err) {
                    console.log(err);
                }
                else {
                    this._audioSource.clip = clip;
                    this._audioSource.play();
                    this.audioSource.volume = volume;
                }
            });
        }
    }

    /**
     * stop the audio play
     */
    stop() {
        this._audioSource.stop();
    }

    /**
     * pause the audio play
     */
    pause() {
        this._audioSource.pause();
    }

    /**
     * resume the audio play
     */
    resume() {
        this._audioSource.play();
    }
}