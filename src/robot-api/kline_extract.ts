

export class kline_extract {
    MV1: number;
    MV8: number;
    MV16: number;
    MV30: number;
    MV99: number;
    maxPrice: number;
    minPrice: number;
    lenght: number;

    constructor(private readonly data: number[]) {
        this.lenght = this.data.length
        this.MV99 = this.calculateMovingAverage(99)
        this.MV1 = this.calculateMovingAverage(1);
        this.MV8 = this.calculateMovingAverage(8);
        this.MV16 = this.calculateMovingAverage(16);
        this.MV30 = this.calculateMovingAverage(30);

        this.maxPrice = this.getMaxValor();
        this.minPrice = this.getMinValor();
    }

    private calculateMovingAverage(period: number): number {
        if (period > this.data.length) {
            throw new Error('Period is greater than the length of the data.');
        }

        let sum = 0;
        for (let i = 0; i < period; i++) {
            sum += parseFloat(this.data[i][4]);
        }

        return sum / period;
    }

    private getMinValor(): number {
        if (this.data.length === 0) {
            throw new Error('Data array is empty.');
        }

        return Math.min(...this.data.map(item => parseFloat(item[3]))); // Assuming the low price is at index 3
    }

    private getMaxValor(): number {
        if (this.data.length === 0) {
            throw new Error('Data array is empty.');
        }

        return Math.max(...this.data.map(item => parseFloat(item[2]))); // Assuming the high price is at index 2
    }


    getAllProperties(): any {
        return {
            MV1: this.MV1,
            MV8: this.MV8,
            MV16: this.MV16,
            MV30: this.MV30,
            MV99: this.MV99,
            maxPrice: this.maxPrice,
            minPrice: this.minPrice,

            length: this.lenght
        };
    }
}

