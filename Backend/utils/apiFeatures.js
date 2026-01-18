class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        let keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        }: {};

        this.query.find({...keyword});
        return this;
    }

    filter() {
        const queryStrCopy = {...this.queryStr};
        // Before
        //console.log(queryStrCopy);
        // Removing fields from the query
        const removeFields = ['keyword','page', 'limit'];
        removeFields.forEach(field => delete queryStrCopy[field]);

        //after

        let queryStr = JSON.stringify(queryStrCopy);
        queryStr = queryStr.replace(/\b(lt|lte|gt|gte)\b/g, match => `$${match}`);
        console.log(queryStr);

        
        

        const parsed = JSON.parse(queryStr);
        console.log(queryStrCopy);

        Object.keys(parsed).forEach(key => {
            if (key.includes('[')) {
                const field = key.split('[')[0];
                const operator = key.match(/\[(.*)\]/)[1];

                if (!parsed[field]) parsed[field] = {}; 
                parsed[field][operator] = parsed[key];
                delete parsed[key];
            }
        })
        // { 'price[lt]': '500', 'price[gt]': '1000' }
        // { 'price[$lt]': '500', 'price[$gt]': '1000' }

        this.query = this.query.find(parsed);
        return this;

    }

    paginate(resPerPage) {

        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);
        this.query.limit(resPerPage).skip(skip);
        return this;

    }
}

export default APIFeatures;