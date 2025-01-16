export default function useTest(value) {
    const double = value * 2
    const triple = value * 3
    return {
        double, triple
    }
}