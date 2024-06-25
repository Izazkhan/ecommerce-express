export const mapErrorDetails = (details) => {
    const errors = {};
    details.forEach((error) => {
        const key = error.context.key || 'unknown';
        errors[key] = error.message;
    });
    return errors;
};

export const generateErrorSummary = (details) => {
    if (!details || details.length === 0) {
      return '';
    }
  
    let summary = '';
    const numErrors = details.length;
  
    // Add the first error message
    summary += details[0].message;
  
    // Append "and X more errors" if there are additional errors
    if (numErrors > 1) {
      const moreErrorsCount = numErrors - 1;
      summary += ` (and ${moreErrorsCount} more ${moreErrorsCount > 1 ? 'errors' : 'error'})`;
    }
    return summary;
  };