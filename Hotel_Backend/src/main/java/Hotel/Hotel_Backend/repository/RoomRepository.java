package Hotel.Hotel_Backend.repository;


import Hotel.Hotel_Backend.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {
}