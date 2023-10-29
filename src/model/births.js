// Script contenant l'ensemble des méthodes pour les données de la table births
class Birth {
    _idbirth;
    _country;
    _bank_income;
    _continent;
    _year;
    _area;
    _month;
    _source_year;
    _value;

    constructor(idbirth, country, bank_income, continent, year, area, month, source_year, value) {
        this._idbirth = idbirth;
        this._country = country;
        this._bank_income = bank_income;
        this._continent = continent;
        this._year = year;
        this._area = area;
        this._month = month;
        this._source_year = source_year;
        this._value = value;
    };

    get idbirth() {
        return this._idbirth;
    };

    get country() {
        return this._country;
    };

    get bank_income() {
        return this._bank_income;
    };

    get continent() {
        return this._continent;
    };

    get year() {
        return this._year;
    };

    get area() {
        return this._area;
    };

    get month() {
        return this._month;
    };

    get source_year() {
        return this._source_year;
    };

    get value() {
        return this._value;
    };

    set idbirth(idbirth) {
        this._idbirth = idbirth;
    };

    set country(country) {
        this._country = country;
    };

    set bank_income(bank_income) {
        this._bank_income = bank_income;
    };

    set continent(continent) {
        this._continent = continent;
    };

    set year(year) {
        this._year = year;
    };

    set area(area) {
        this._area = area;
    };

    set month(month) {
        this._month = month;
    };

    set source_year(source_year) {
        this._source_year = source_year;
    };

    set value(value) {
        this._value = value;
    };
    getBirthsByYearAndNbBirths
 
    /* Fonction getBirthsByYearAndNbBirths permettant de récupérer l'année et le nombre de naissance par année */
    async getBirthsValuesByYear() {
        
        const { data: births, error } = await supabaseAuth
            .from('births')
            .select("year, value")
        return births
    }

    async getBirthsValuesByYearContinent(continent) {
        const { data: births, error } = await supabaseAuth
            .from('births')
            .select("year, value")
            .eq('continent', continent)
        return births
    }

    /* Fonction getBirthsByBankIncome permettant de récupérer le bank income et le nombre de naissance */
    async getBirthsByBankIncome() {
        const { data: births, error } = await supabaseAuth
            .from('births')
            .select("bank_income, value")
        return births
    }

    async getBirthsByBankIncomeContinent(continent) {
        const { data: births, error } = await supabaseAuth
            .from('births')
            .select("bank_income, value")
            .eq('continent', continent)
        return births
    }
    
    /* Fonction getBirthsByCountry permettant de récupérer le pays et le nombre de naissance */
    async getBirthsByCountry() {
        const { data: births, error } = await supabaseAuth
            .from('births')
            .select("country, value")
        return births
    }

    async getBirthsByCountryContinent(continent) {
        const { data: births, error } = await supabaseAuth
            .from('births')
            .select("country, value")
            .eq('continent', continent)
        return births
    }

    /* Fonction getBirthsValues permettant de récupérer le nombre de naissance */
    async getBirthsValues() {
        const { data: births, error } = await supabaseAuth
            .from('births')
            .select("value")
        return births
    }

    async getBirthsValuesContinent(continent) {
        const { data: births, error } = await supabaseAuth
            .from('births')
            .select("value")
            .eq('continent', continent)
        return births
    }


    /* Fonction permettant de simuler le GROUP BY pour une colonne choisie */
    groupValueByColumn(column, births) {
        const birthsByColumn = births.reduce((acc, birth) => {
            const arrColumn = birth[column];
            const value = birth.value;
            if (acc[arrColumn]) {
                acc[arrColumn] += value;
            } else {
                acc[arrColumn] = value;
            }
            return acc;
        }, {});
        return birthsByColumn;
    }

    /* Fonction permettant de simuler le GROUP BY pour avoir le total */
    groupValues(births) {
        const birthsTotal = births.reduce((acc, birth) => {
            const value = birth.value;
            return acc + value; // Accumulation correcte
        }, 0);
        return birthsTotal;
    }

    async getAverageBirthsPerYear() {
        const births = await this.getBirthsByYearAndNbBirths();
        
        const birthsByYear = this.groupValueByColumn("year", births);
    
        // Calcul de la moyenne
        const years = Object.keys(birthsByYear);
        const values = Object.values(birthsByYear);
    
        const totalBirths = values.reduce((acc, value) => acc + value, 0);
        const averageBirths = totalBirths / years.length;
    
        return averageBirths;
    }
    
    
}