import { Vector2 } from "three"

/**
 * @typedef PatternLineDef
 * @property {number} angle Line angle in radians.
 * @property {?Vector2} base Base point for scaling, rotation and anchoring. [0,0] if not specified.
 * @property {Vector2} offset Offset for line instantiation.
 * @property {?number[]} dashes Dash lengths. Solid line if not specified. Negative numbers for
 *  spaces, positive for dashes, zero for dots.
 */

export class Pattern {
    /**
     * @param {PatternLineDef[]} lines
     */
    constructor(lines, name = null) {
        this.lines = lines
        this.name = name
    }

    static ParsePatFile(content) {
        const lines = content.split(/\r?\n/)
        if (lines.length < 2) {
            throw new Error("Invalid .pat file content")
        }
        let name = null
        const lineDefs = []
        for (let line of lines) {
            line = line.trim()
            if (line == "") {
                continue
            }
            if (line.startsWith(";")) {
                continue
            }
            if (name === null) {
                const m = line.match(/\*([^,]+)(?:,.*)?/)
                if (!m) {
                    throw new Error("Bad header for .pat file content")
                }
                name = m[1]
                continue
            }
            const commentPos = line.indexOf(";")
            if (commentPos != -1) {
                line = line.substring(0, commentPos).trim()
            }
            let params = line.split(/\s*,\s*/)
            /* Tolerate trailing comma. */
            if (params[params.length - 1] == "") {
                params.length = params.length - 1
            }
            params = params.map(s => {
                const x = parseFloat(s)
                if (isNaN(x)) {
                    throw new Error("Failed to parse number in .pat file: " + s)
                }
                return x
            })
            const lineDef = {
                angle: params[0] * Math.PI / 180,
                base: new Vector2(params[1], params[2]),
                offset: new Vector2(params[3], params[4])
            }
            if (params.length > 5) {
                lineDef.dashes = params.slice(5)
            }
            lineDefs.push(lineDef)
        }
        return new Pattern(lineDefs, name)
    }
}

const patternsRegistryMetric = new Map()
const patternsRegistryImperial = new Map()

/** @param {Pattern} pattern */
export function RegisterPattern(pattern, isMetric = true) {
    if (!pattern.name) {
        throw new Error("Anonymous pattern cannot be registered")
    }
    const name = pattern.name.toUpperCase()
    const registry = isMetric ? patternsRegistryMetric : patternsRegistryImperial
    if (registry.has(name)) {
        console.warn(`Pattern with name ${name} is already registered`)
        return
    }
    registry.set(name, pattern)
}

/** @return {?Pattern} */
export function LookupPattern(name, isMetric = true) {
    return (isMetric ? patternsRegistryMetric : patternsRegistryImperial).get(name.toUpperCase())
}
