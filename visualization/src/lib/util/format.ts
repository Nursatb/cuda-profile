import {AddressSpace} from '../profile/warp';

export function formatByteSize(value: number): string
{
    const sizes = [{
        label: 'GiB',
        exponent: 3
    }, {
        label: 'MiB',
        exponent: 2
    }, {
        label: 'KiB',
        exponent: 1
    }, {
        label: 'B',
        exponent: 0
    }];

    for (const size of sizes)
    {
        const power = Math.pow(1024, size.exponent);
        const scaled = value / power;

        if (scaled >= 1)
        {
            return `${scaled.toFixed(2)} ${size.label}`;
        }
    }

    return '0 B';
}
export function formatAddressSpace(space: AddressSpace): string
{
    switch (space)
    {
        case AddressSpace.Global: return 'global';
        case AddressSpace.Shared: return 'shared';
        case AddressSpace.Constant: return 'constant';
        default: return 'unknown';
    }
}