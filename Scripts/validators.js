// Regex pattern for validating title, duration,date,tags and duplicate words

const TITLE_PATTERN =/^(?!\s)(?!.*\s$)(?!.*\s{2,}).{2,100}$/;

const DURATION_PATTERN = /^[1-9]\d{0,4}$/;

const DUE_DATE_PATTERN = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

const TAG_PATTERN = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;

const DUPLICATE_WORD_PATTERN = /\b(\w+)\s+\1\b/i;


// Validating of a task title against formatting rules.


export function validateTitle(value) {
    if (!value) {
        return{ valid:false, message:"Title is required."};
    }

    if(!TITLE_PATTERN.test(value)) {
        return{valid:false, message:"Title must be 2-100 characters,no leading/trailing or double spaces."};

    }
 
    if(DUPLICATE_WORD_PATTERN.test(value)) {
        return{valid:false, message:"Title cannot contain duplicate consecutive words"};

    }
    return{valid:true, value:value};

}

// Validating a task duration expected to be a positive whole number.

export function validateDuration(value) {
    if (!value) {
        return{valid:false, message:"Duration is required."}
    }

    const str=String(value).trim();

    if(!DURATION_PATTERN.test(str)) {
        return{valid:false, message:"Duration must be a positive whole number(no decimals or leading zeros)."};
    
    }

    return{valid:true, value:Number(str)};
}

// Validation of  a due date string in YYYY-MM-DD format.

export function validateDate(value) {
    if(!value) {
        return{ valid:false, message:"Due date is required."};
    }

    const str=value.trim();

    if(!DUE_DATE_PATTERN.test(str)) {
        return{valid:false, message:"Date must follow YYYY-MM-DD format."};

    }

    const [year, month, day]= str.split("-").map(Number);
    const testDate = new Date(year, month - 1, day);

   if (
        testDate.getFullYear() !== year ||
        testDate.getMonth() !== month - 1 ||
        testDate.getDate() !== day
    ) {
        return {valid: false, message: "Invalid calendar date."};

    }

    return { valid: true, value: str };
}

// Validation of a tag string which has to contain only letters .

export function validateTag(value) {
    if (!value) {
        return{valid:false, message:"Tag is required."};

    }
    
    if (!TAG_PATTERN.test(value)) {
        return{valid:false, message:"Tag can only contain letters, spaces, or single hyphens."};

    }

    return{valid:true, value:value};
}

// Returns null if the input is empty or produces an invalid regex,

export function compileRegex(input, flags = "i") {
    try {
        return input ? new RegExp(input, flags) : null;
    } catch (error) {
        return null;
    }
}
