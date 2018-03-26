/**
 * This file has been automatically generated by the [capnpc-ts utility](https://github.com/jdiaz5513/capnp-ts).
 */

/* tslint:disable */

import * as capnp from "capnp-ts";
import { ObjectSize as __O, Struct as __S } from 'capnp-ts';
export const _capnpFileId = "db50473b24db4f29";
export class Dim3 extends __S {
    static readonly _capnp = { displayName: "Dim3", id: "87bddb55c89457c5", size: new __O(16, 0) };
    getX(): number { return __S.getInt32(0, this); }
    setX(value: number): void { __S.setInt32(0, value, this); }
    getY(): number { return __S.getInt32(4, this); }
    setY(value: number): void { __S.setInt32(4, value, this); }
    getZ(): number { return __S.getInt32(8, this); }
    setZ(value: number): void { __S.setInt32(8, value, this); }
    toString(): string { return "Dim3_" + super.toString(); }
}
export class MemoryAccess extends __S {
    static readonly _capnp = { displayName: "MemoryAccess", id: "d678722a813fdd16", size: new __O(0, 3) };
    adoptThreadIdx(value: capnp.Orphan<Dim3>): void { __S.adopt(value, __S.getPointer(0, this)); }
    disownThreadIdx(): capnp.Orphan<Dim3> { return __S.disown(this.getThreadIdx()); }
    getThreadIdx(): Dim3 { return __S.getStruct(0, Dim3, this); }
    hasThreadIdx(): boolean { return !__S.isNull(__S.getPointer(0, this)); }
    initThreadIdx(): Dim3 { return __S.initStructAt(0, Dim3, this); }
    setThreadIdx(value: Dim3): void { __S.copyFrom(value, __S.getPointer(0, this)); }
    getAddress(): string { return __S.getText(1, this); }
    setAddress(value: string): void { __S.setText(1, value, this); }
    getValue(): string { return __S.getText(2, this); }
    setValue(value: string): void { __S.setText(2, value, this); }
    toString(): string { return "MemoryAccess_" + super.toString(); }
}
export class Warp extends __S {
    static readonly _capnp = { displayName: "Warp", id: "dbf542119910200f", size: new __O(16, 3) };
    static _Accesses: capnp.ListCtor<MemoryAccess>;
    adoptAccesses(value: capnp.Orphan<capnp.List<MemoryAccess>>): void { __S.adopt(value, __S.getPointer(0, this)); }
    disownAccesses(): capnp.Orphan<capnp.List<MemoryAccess>> { return __S.disown(this.getAccesses()); }
    getAccesses(): capnp.List<MemoryAccess> { return __S.getList(0, Warp._Accesses, this); }
    hasAccesses(): boolean { return !__S.isNull(__S.getPointer(0, this)); }
    initAccesses(length: number): capnp.List<MemoryAccess> { return __S.initList(0, Warp._Accesses, length, this); }
    setAccesses(value: capnp.List<MemoryAccess>): void { __S.copyFrom(value, __S.getPointer(0, this)); }
    adoptBlockIdx(value: capnp.Orphan<Dim3>): void { __S.adopt(value, __S.getPointer(1, this)); }
    disownBlockIdx(): capnp.Orphan<Dim3> { return __S.disown(this.getBlockIdx()); }
    getBlockIdx(): Dim3 { return __S.getStruct(1, Dim3, this); }
    hasBlockIdx(): boolean { return !__S.isNull(__S.getPointer(1, this)); }
    initBlockIdx(): Dim3 { return __S.initStructAt(1, Dim3, this); }
    setBlockIdx(value: Dim3): void { __S.copyFrom(value, __S.getPointer(1, this)); }
    getWarpId(): number { return __S.getInt32(0, this); }
    setWarpId(value: number): void { __S.setInt32(0, value, this); }
    getDebugId(): number { return __S.getInt32(4, this); }
    setDebugId(value: number): void { __S.setInt32(4, value, this); }
    getSize(): number { return __S.getUint8(8, this); }
    setSize(value: number): void { __S.setUint8(8, value, this); }
    getKind(): number { return __S.getUint8(9, this); }
    setKind(value: number): void { __S.setUint8(9, value, this); }
    getSpace(): number { return __S.getUint8(10, this); }
    setSpace(value: number): void { __S.setUint8(10, value, this); }
    getTypeIndex(): number { return __S.getInt32(12, this); }
    setTypeIndex(value: number): void { __S.setInt32(12, value, this); }
    getTimestamp(): string { return __S.getText(2, this); }
    setTimestamp(value: string): void { __S.setText(2, value, this); }
    toString(): string { return "Warp_" + super.toString(); }
}
export class AllocRecord extends __S {
    static readonly _capnp = { displayName: "AllocRecord", id: "f01eee9ad5904e3a", size: new __O(24, 4) };
    getAddress(): string { return __S.getText(0, this); }
    setAddress(value: string): void { __S.setText(0, value, this); }
    getSize(): capnp.Uint64 { return __S.getUint64(0, this); }
    setSize(value: capnp.Uint64): void { __S.setUint64(0, value, this); }
    getElementSize(): number { return __S.getUint32(8, this); }
    setElementSize(value: number): void { __S.setUint32(8, value, this); }
    getSpace(): number { return __S.getUint8(12, this); }
    setSpace(value: number): void { __S.setUint8(12, value, this); }
    getTypeIndex(): number { return __S.getInt32(16, this); }
    setTypeIndex(value: number): void { __S.setInt32(16, value, this); }
    getTypeString(): string { return __S.getText(1, this); }
    setTypeString(value: string): void { __S.setText(1, value, this); }
    getNameIndex(): number { return __S.getInt32(20, this); }
    setNameIndex(value: number): void { __S.setInt32(20, value, this); }
    getNameString(): string { return __S.getText(2, this); }
    setNameString(value: string): void { __S.setText(2, value, this); }
    getLocation(): string { return __S.getText(3, this); }
    setLocation(value: string): void { __S.setText(3, value, this); }
    getActive(): boolean { return __S.getBit(104, this); }
    setActive(value: boolean): void { __S.setBit(104, value, this); }
    toString(): string { return "AllocRecord_" + super.toString(); }
}
export class Trace extends __S {
    static readonly _capnp = { displayName: "Trace", id: "e9cd0a553d9f75a8", size: new __O(24, 6) };
    static _Warps: capnp.ListCtor<Warp>;
    static _Allocations: capnp.ListCtor<AllocRecord>;
    adoptWarps(value: capnp.Orphan<capnp.List<Warp>>): void { __S.adopt(value, __S.getPointer(0, this)); }
    disownWarps(): capnp.Orphan<capnp.List<Warp>> { return __S.disown(this.getWarps()); }
    getWarps(): capnp.List<Warp> { return __S.getList(0, Trace._Warps, this); }
    hasWarps(): boolean { return !__S.isNull(__S.getPointer(0, this)); }
    initWarps(length: number): capnp.List<Warp> { return __S.initList(0, Trace._Warps, length, this); }
    setWarps(value: capnp.List<Warp>): void { __S.copyFrom(value, __S.getPointer(0, this)); }
    adoptAllocations(value: capnp.Orphan<capnp.List<AllocRecord>>): void { __S.adopt(value, __S.getPointer(1, this)); }
    disownAllocations(): capnp.Orphan<capnp.List<AllocRecord>> { return __S.disown(this.getAllocations()); }
    getAllocations(): capnp.List<AllocRecord> { return __S.getList(1, Trace._Allocations, this); }
    hasAllocations(): boolean { return !__S.isNull(__S.getPointer(1, this)); }
    initAllocations(length: number): capnp.List<AllocRecord> { return __S.initList(1, Trace._Allocations, length, this); }
    setAllocations(value: capnp.List<AllocRecord>): void { __S.copyFrom(value, __S.getPointer(1, this)); }
    getKernel(): string { return __S.getText(2, this); }
    setKernel(value: string): void { __S.setText(2, value, this); }
    getStart(): number { return __S.getFloat64(0, this); }
    setStart(value: number): void { __S.setFloat64(0, value, this); }
    getEnd(): number { return __S.getFloat64(8, this); }
    setEnd(value: number): void { __S.setFloat64(8, value, this); }
    getType(): string { return __S.getText(3, this); }
    setType(value: string): void { __S.setText(3, value, this); }
    adoptGridDim(value: capnp.Orphan<Dim3>): void { __S.adopt(value, __S.getPointer(4, this)); }
    disownGridDim(): capnp.Orphan<Dim3> { return __S.disown(this.getGridDim()); }
    getGridDim(): Dim3 { return __S.getStruct(4, Dim3, this); }
    hasGridDim(): boolean { return !__S.isNull(__S.getPointer(4, this)); }
    initGridDim(): Dim3 { return __S.initStructAt(4, Dim3, this); }
    setGridDim(value: Dim3): void { __S.copyFrom(value, __S.getPointer(4, this)); }
    adoptBlockDim(value: capnp.Orphan<Dim3>): void { __S.adopt(value, __S.getPointer(5, this)); }
    disownBlockDim(): capnp.Orphan<Dim3> { return __S.disown(this.getBlockDim()); }
    getBlockDim(): Dim3 { return __S.getStruct(5, Dim3, this); }
    hasBlockDim(): boolean { return !__S.isNull(__S.getPointer(5, this)); }
    initBlockDim(): Dim3 { return __S.initStructAt(5, Dim3, this); }
    setBlockDim(value: Dim3): void { __S.copyFrom(value, __S.getPointer(5, this)); }
    getWarpSize(): number { return __S.getUint32(16, this); }
    setWarpSize(value: number): void { __S.setUint32(16, value, this); }
    getBankSize(): number { return __S.getUint32(20, this); }
    setBankSize(value: number): void { __S.setUint32(20, value, this); }
    toString(): string { return "Trace_" + super.toString(); }
}
Warp._Accesses = capnp.CompositeList(MemoryAccess);
Trace._Warps = capnp.CompositeList(Warp);
Trace._Allocations = capnp.CompositeList(AllocRecord);
