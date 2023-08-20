export const metadata = {
  title: 'Autenticación',
  description: 'Autenticación del dashboard del ecommerce jumpers',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <div className='flex justify-center items-center h-full'>
      {children}
    </div>
        
  )
}
