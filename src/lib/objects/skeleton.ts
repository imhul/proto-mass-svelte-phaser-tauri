import { anims, directions } from '$lib/objects/stats';
import type { IMotion, IOpposite, IUnit } from '$lib/types';

class Skeleton extends Phaser.GameObjects.Sprite implements IUnit {
    private startX: number;
    private startY: number;
    private distance: number;
    private motion: IMotion;
    private anim: any;
    private direction: any;
    private speed: number;
    private f: number;
    public id: string;

    constructor(
        id: string,
        scene: Phaser.Scene,
        x: number,
        y: number,
        motion: IMotion,
        direction: IOpposite,
        distance: number
    ) {
        super(scene, x, y, 'skeleton', directions[direction].offset);

        this.id = id;
        this.scene = scene;
        this.startX = x;
        this.startY = y;
        this.distance = distance;
        this.name = 'skeleton';
        this.motion = motion;
        this.anim = anims[motion];
        this.direction = directions[direction];
        this.speed = 0.3;
        this.f = this.anim.startFrame;

        this.depth = y + 64;

        scene.time.delayedCall(
            this.anim.speed * 1000,
            this.changeFrame,
            [],
            this
        );
    }

    changeFrame() {
        this.f++;

        var delay = this.anim.speed;

        if (this.f === this.anim.endFrame) {
            switch (this.motion) {
                case 'walk':
                    this.f = this.anim.startFrame;
                    this.frame = this.texture.get(
                        this.direction.offset + this.f
                    );
                    this.scene.time.delayedCall(
                        delay * 1000,
                        this.changeFrame,
                        [],
                        this
                    );
                    break;

                case 'attack':
                    delay = Math.random() * 2;
                    this.scene.time.delayedCall(
                        delay * 1000,
                        this.resetAnimation,
                        [],
                        this
                    );
                    break;

                case 'idle':
                    delay = 0.5 + Math.random();
                    this.scene.time.delayedCall(
                        delay * 1000,
                        this.resetAnimation,
                        [],
                        this
                    );
                    break;

                case 'die':
                    delay = 6 + Math.random() * 6;
                    this.scene.time.delayedCall(
                        delay * 1000,
                        this.resetAnimation,
                        [],
                        this
                    );
                    break;
            }
        } else {
            this.frame = this.texture.get(
                this.direction.offset + this.f
            );

            this.scene.time.delayedCall(
                delay * 1000,
                this.changeFrame,
                [],
                this
            );
        }
    }

    resetAnimation() {
        this.f = this.anim.startFrame;

        this.frame = this.texture.get(this.direction.offset + this.f);

        this.scene.time.delayedCall(
            this.anim.speed * 1000,
            this.changeFrame,
            [],
            this
        );
    }

    update() {
        if (this.motion === 'walk') {
            this.x += this.direction.x * this.speed;

            if (this.direction.y !== 0) {
                this.y += this.direction.y * this.speed;
                this.depth = this.y + 64;
            }

            //  Walked far enough?
            if (
                Phaser.Math.Distance.Between(
                    this.startX,
                    this.startY,
                    this.x,
                    this.y
                ) >= this.distance
            ) {
                this.direction = directions[this.direction.opposite];
                this.f = this.anim.startFrame;
                this.frame = this.texture.get(
                    this.direction.offset + this.f
                );
                this.startX = this.x;
                this.startY = this.y;
            }
        }
    }
}

export default Skeleton;
