import { forwardRef, useState } from 'react'
import type { InputHTMLAttributes } from 'react'

interface FileInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label?: string
  error?: string
  success?: boolean
  helperText?: string
  accept?: string
  multiple?: boolean
  onChange?: (files: FileList | null) => void
  preview?: boolean
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ 
    label, 
    error, 
    success, 
    helperText,
    accept,
    multiple = false,
    onChange,
    preview = false,
    className = '', 
    id,
    ...props 
  }, ref) => {
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
    const inputId = id || `file-input-${Math.random().toString(36).substr(2, 9)}`
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      setSelectedFiles(files)
      onChange?.(files)
    }

    const baseStyles = 'w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-yellow-400 file:to-red-500 file:text-white file:cursor-pointer hover:file:opacity-90'
    
    const stateStyles = error
      ? 'border-red-300 focus:border-red-500 focus:ring-red-500 bg-red-50'
      : success
      ? 'border-green-300 focus:border-green-500 focus:ring-green-500 bg-green-50'
      : 'border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500 bg-white hover:border-yellow-400'

    return (
      <div className="relative">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-semibold text-slate-700 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <input
          {...props}
          ref={ref}
          id={inputId}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className={`${baseStyles} ${stateStyles} ${className}`}
        />
        
        {selectedFiles && selectedFiles.length > 0 && (
          <div className="mt-3 space-y-2">
            {Array.from(selectedFiles).map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-yellow-200"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-r from-yellow-400 to-red-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{file.name}</p>
                    <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
                {preview && file.type.startsWith('image/') && (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-16 h-16 rounded-lg object-cover ml-3"
                  />
                )}
              </div>
            ))}
          </div>
        )}
        
        {(error || helperText) && (
          <p className={`mt-1.5 text-sm ${error ? 'text-red-600' : 'text-slate-500'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    )
  }
)

FileInput.displayName = 'FileInput'

export default FileInput
