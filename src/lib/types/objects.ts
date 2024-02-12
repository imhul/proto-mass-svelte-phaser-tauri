import type { Body } from '$lib/iso';

type IBody = typeof Body;

export interface ICube extends IBody {
    id: string;
}
