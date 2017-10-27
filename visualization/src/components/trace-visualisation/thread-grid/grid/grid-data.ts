import {MemoryAccess, Warp} from '../../../../lib/profile/memory-access';
import {createSelector} from 'reselect';
import {Dictionary} from 'lodash';

export interface GridSelection
{
    z: number;
    y: number;
    x: number;
    width: number;
    height: number;
}

export interface GridBounds
{
    x: number;
    y: number;
    z: number;
}

export interface AddressSelection
{
    start: string;
    size: number;
}

export function createBlockSelector()
{
    return createSelector(
        (accessGroup: Warp) => accessGroup,
        (accessGroup: Warp) => createBlockData(accessGroup)
    );
}

export function createBlockData(accessGroup: Warp): Dictionary<MemoryAccess>
{
    const data: Dictionary<MemoryAccess> = {};

    for (const access of accessGroup.accesses)
    {
        data[`${access.threadIdx.z}.${access.threadIdx.y}.${access.threadIdx.x}`] = access;
    }

    return data;
}
