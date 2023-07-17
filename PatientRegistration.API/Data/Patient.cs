namespace PatientRegistration.API.Data
{
    public class Patient
    {
        public int Id { get; set; }
        public string? Name { get; set; }

        public string? Email { get; set; } 

        public string? Country { get; set; } 

        public int DoctorId { get; set; }
        
    }
        
}