class kline_extract {
    MV1: number;
    MV8: number;
    MV16: number;
    MV30: number;
    maxPrice: number;
    minPrice: number;

    constructor(private readonly data: number[]) {
        // Assuming that the data is an array of numbers
        this.MV1 = this.calculateMovingAverage(1);
        this.MV8 = this.calculateMovingAverage(8);
        this.MV16 = this.calculateMovingAverage(16);
        this.MV30 = this.calculateMovingAverage(30);
        this.maxPrice = this.getMinValor();
        this.minPrice = this.getMinValor();
    }

    private calculateMovingAverage(period: number): number {
        if (period > this.data.length) {
            throw new Error('Period is greater than the length of the data.');
        }

        let sum = 0;
        for (let i = 0; i < period; i++) {
            sum += this.data[i];
        }

        return sum / period;
    }

    private getMinValor(): number {
        if (this.data.length === 0) {
            throw new Error('Data array is empty.');
        }

        return Math.min(...this.data);
    }

    private getMaxValor(): number {
        if (this.data.length === 0) {
            throw new Error('Data array is empty.');
        }

        return Math.max(...this.data);
    }
}

