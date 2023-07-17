using Microsoft.AspNetCore.Mvc;
using PatientRegistration.API.Data;

namespace PatientRegistration.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientsController : ControllerBase
    {
        private readonly PatientContext _context;

        public PatientsController(PatientContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetPatients()
        {
            try
            {
                var patients = _context.Patients.ToList();
                return Ok(patients);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return StatusCode(500, "An error occurred while retrieving the patients.");
            }
        }

        [HttpGet("{doctorId}")]
        public IActionResult GetDoctorPatients(int doctorId)
        {
            var patients = _context.Patients.Where(p => p.DoctorId == doctorId).ToList();
            return Ok(patients);
        }

        [HttpPost]
        public IActionResult AddPatient(Patient patient)
        {
            _context.Patients.Add(patient);
            _context.SaveChanges();
            return Ok(patient);
        }
        
    }
}
