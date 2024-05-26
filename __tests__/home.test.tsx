import { findByRole, findByText, render, screen, waitFor } from '@testing-library/react';

import Home from '@/pages/index';

jest.mock('next/router', () => require('next-router-mock'));


describe('Testing Home page', () => {

    test('Loading products', ()=> {
        render(<Home/>);
        const loadingProducts = screen.getByText(/loading products/i);
        expect(loadingProducts).toBeInTheDocument();

    });

    test('Product listing - Loading and Our Products title', async () => {
        render(<Home />)

        // validate loading 
        expect(screen.getByText(/loading/i)).toBeInTheDocument();

        screen.debug()

        await waitFor(() => {
            expect(screen.getByRole('heading', { name: /our products/i })).toBeInTheDocument()
            
        }, { timeout: 60000 })
    })

    test('Product Cards visibles', async ()=> {
        render(<Home/>)
        
        await waitFor(()=> {
            expect(screen.getByText(/respaldo tendencia/i)).toBeInTheDocument()
        })
    })

    
})
