// component/Schooltypes.jsx
import React, { useState } from 'react'
import Junior   from './cards/junior/Junior'
import Boarding from './cards/boarding/Boarding'
import Senior   from './cards/senior/Senior'

const SchoolTypes = () => {
  // Each card manages its OWN open state independently
  const [openJunior,   setOpenJunior]   = useState(false)
  const [openBoarding, setOpenBoarding] = useState(false)
  const [openSenior,   setOpenSenior]   = useState(false)

  return (
    <section className="relative z-10 bg-[#f5f0eb] pb-8">
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative -mt-[40px] bg-white rounded-2xl"
          style={{
            display:       'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            boxShadow:     '0 20px 60px rgba(0,0,0,.12)',
            overflow:      'visible',
          }}
        >
          <Junior
            open={openJunior}
            onToggle={() => setOpenJunior(v => !v)}
            hasBorder={true}
          />
          <Boarding
            open={openBoarding}
            onToggle={() => setOpenBoarding(v => !v)}
            hasBorder={true}
          />
          <Senior
            open={openSenior}
            onToggle={() => setOpenSenior(v => !v)}
            hasBorder={false}
          />
        </div>
      </div>
    </section>
  )
}

export default SchoolTypes