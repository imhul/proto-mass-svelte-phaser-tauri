import Phaser from 'phaser';

const map = (
    value: number,
    min: number,
    max: number,
    newMin: number,
    newMax: number
) => {
    return ((value - min) / (max - min)) * (newMax - newMin) + newMin;
};

class FollowerSprite extends Phaser.GameObjects.Sprite {
    navMesh: any;
    path: any;
    currentTarget: any;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        navMesh: any
    ) {
        super(scene, x, y, 'follower');

        this.navMesh = navMesh;
        this.path = null;
        this.currentTarget = null;
        this.scene = scene;

        // Enable arcade physics for moving with velocity
        scene.physics.world.enable(this);

        scene.add.existing(this);
        scene.events.on('update', this.update, this);
        scene.events.once('shutdown', this.destroy, this);
    }

    goTo(targetPoint: any) {
        // Find a path to the target
        this.path = this.navMesh.findPath(
            new Phaser.Math.Vector2(this.x, this.y),
            targetPoint
        );

        // If there is a valid path, grab the first point from the path and set it as the target
        if (this.path && this.path.length > 0)
            this.currentTarget = this.path.shift();
        else this.currentTarget = null;
    }

    update(time: undefined, deltaTime: number | undefined) {
        // Bugfix: Phaser's event emitter caches listeners, so it's possible to get updated once after
        // being destroyed
        if (!this.body) return;

        // Stop any previous movement
        if (this.body.velocity instanceof Phaser.Math.Vector2) {
            this.body.velocity.set(0);
        }

        if (this.currentTarget) {
            // Check if we have reached the current target (within a fudge factor)
            const { x, y } = this.currentTarget;
            const distance = Phaser.Math.Distance.Between(
                this.x,
                this.y,
                x,
                y
            );

            if (distance < 5) {
                // If there is path left, grab the next point. Otherwise, null the target.
                if (this.path.length > 0)
                    this.currentTarget = this.path.shift();
                else this.currentTarget = null;
            }

            // Slow down as we approach final point in the path. This helps prevent issues with the
            // physics body overshooting the goal and leaving the mesh.
            let speed = 400;
            if (this.path.length === 0 && distance < 50) {
                speed = map(distance, 50, 0, 400, 50);
            }

            // Still got a valid target?
            if (this.currentTarget && deltaTime)
                this.moveTowards(
                    this.currentTarget,
                    speed,
                    deltaTime / 1000
                );
        }
    }

    moveTowards(
        targetPosition: { x: number; y: number },
        maxSpeed = 200,
        elapsedSeconds: number
    ) {
        const { x, y } = targetPosition;
        const angle = Phaser.Math.Angle.Between(this.x, this.y, x, y);
        const distance = Phaser.Math.Distance.Between(
            this.x,
            this.y,
            x,
            y
        );
        const targetSpeed = distance / elapsedSeconds;
        const magnitude = Math.min(maxSpeed, targetSpeed);
        if (!this?.body?.velocity) return;
        this.scene.physics.velocityFromRotation(
            angle,
            magnitude,
            this.body.velocity as Phaser.Math.Vector2
        ); // Cast this.body.velocity to Phaser.Math.Vector2
        this.rotation = angle;
    }

    destroy() {
        if (this.scene)
            this.scene.events.off('update', this.update, this);
        super.destroy();
    }
}

export default FollowerSprite;
