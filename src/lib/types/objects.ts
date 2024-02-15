export type IMotion = 'walk' | 'attack' | 'idle' | 'die';

export interface IUnit extends Phaser.GameObjects.Sprite {
    id: string;
}

export type IOpposite =
    | 'west'
    | 'northWest'
    | 'north'
    | 'northEast'
    | 'east'
    | 'southEast'
    | 'south'
    | 'southWest';

export interface IDirection {
    offset: number;
    x: number;
    y: number;
    opposite: IOpposite;
}

export interface IDirections {
    [key: string]: IDirection;
}

export interface IAnim {
    startFrame: number;
    endFrame: number;
    speed: number;
}

export interface IAnims {
    [key: string]: IAnim;
}
